package br.univile.backrepository.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.univile.backrepository.entity.Agendamentos;
import br.univile.backrepository.service.AgendamentosService;

@RestController
@RequestMapping("/agendamentos")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AgendamentosController {
    
    @Autowired
    private AgendamentosService service;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<Agendamentos>> getAll(){
        var listaAgendamentos = service.getAll();
        return new ResponseEntity<List<Agendamentos>>(listaAgendamentos,HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<Agendamentos> post(@RequestBody Agendamentos Agendamentos){
        if(Agendamentos.getId() == 0){
            service.save(Agendamentos);
            return new ResponseEntity<Agendamentos>(Agendamentos, HttpStatus.OK);
        }
        return ResponseEntity.badRequest().build();
    }
}
