package br.univile.backrepository.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.univile.backrepository.entity.Usuario;
import br.univile.backrepository.service.UsuarioService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UsuarioController {
    
    private UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;
    }

    @CrossOrigin
    @GetMapping
    public List<Usuario> getUsuarios(){

        return usuarioService.getUsuarios();

    }

    @CrossOrigin
    @GetMapping("/{id}")
    public Usuario getUsuarioId(@PathVariable("id") long id){

        return usuarioService.getUsuariosId(id);

    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<String> addUsuario(@RequestBody Usuario request){
        
            try{
    
                String response = usuarioService.addUsuario(request);;
                return ResponseEntity.ok(response);
    
            }catch (RuntimeException e) {
                return ResponseEntity.status(HttpStatus.I_AM_A_TEAPOT).body(e.getMessage());
            }

    }

    @CrossOrigin
    @PutMapping("/atualizar")
    public ResponseEntity<String> updateUsuario(@RequestBody Usuario request){
        
        try{

            String response = usuarioService.updateUsuario(request);
            return ResponseEntity.ok(response);

        }catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.I_AM_A_TEAPOT).body(e.getMessage());
        }

    }

}