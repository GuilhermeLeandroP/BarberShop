package br.univile.backrepository.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    @GetMapping("/{id}")
    public ResponseEntity<List<Agendamentos>> findByUsuarioId(@PathVariable long id){
        var listaAgendamentos = service.findByUsuarioId(id);
        return new ResponseEntity<List<Agendamentos>>(listaAgendamentos,HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<Agendamentos> post(@RequestBody Agendamentos agendamentos){
        if(agendamentos.getId() == 0){
            // isso verifica se tem um agendamento com o mesmo horario e data no mesmo barbeiro
            boolean isConflicting = service.isConflictingAgendamento(agendamentos);
            if (!isConflicting) {
                service.save(agendamentos);
                return new ResponseEntity<Agendamentos>(agendamentos, HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
        }
        return ResponseEntity.badRequest().build();
    }
}
