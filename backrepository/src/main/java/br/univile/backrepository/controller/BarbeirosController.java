package br.univile.backrepository.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.univile.backrepository.entity.Barbeiros;
import br.univile.backrepository.service.BarbeirosService;

@RestController
@RequestMapping("/barbeiros")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BarbeirosController {
        
    @Autowired
    private BarbeirosService service;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<Barbeiros>> getAll(){
        var listaBarbeiros = service.getAll();
        return new ResponseEntity<List<Barbeiros>>(listaBarbeiros,HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<Barbeiros> post(@RequestBody Barbeiros Barbeiros){
        if(Barbeiros.getId() == 0){
            service.save(Barbeiros);
            return new ResponseEntity<Barbeiros>(Barbeiros, HttpStatus.OK);
        }
        return ResponseEntity.badRequest().build();
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<Barbeiros> put(@PathVariable long id,
                                    @RequestBody Barbeiros Barbeiros){
        var BarbeirosAntigo = service.getById(id);
        if (BarbeirosAntigo == null){
            return ResponseEntity.notFound().build();
        }
        BarbeirosAntigo.setNome(Barbeiros.getNome());
        BarbeirosAntigo.setEmail(Barbeiros.getEmail());
        BarbeirosAntigo.setFoto(Barbeiros.getFoto());
        BarbeirosAntigo.setAnosExp(Barbeiros.getAnosExp());

        service.save(BarbeirosAntigo);
        return new ResponseEntity<Barbeiros>(BarbeirosAntigo, HttpStatus.OK);
    }
    
    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<Barbeiros> post(@PathVariable long id){
        Barbeiros barbeiro = service.getById(id);
        if (barbeiro == null){
            return ResponseEntity.notFound().build();
        }

        service.delete(barbeiro);
        return ResponseEntity.badRequest().build();
    }

}
