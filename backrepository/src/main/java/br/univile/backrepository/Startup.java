package br.univile.backrepository;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import br.univile.backrepository.entity.Usuario;
import br.univile.backrepository.service.UsuarioService;


@Component
public class Startup {
    @Autowired
    private UsuarioService service;

    @EventListener
    public void onApplicationEvent(ContextRefreshedEvent event){
        var cliente = new Usuario();
        cliente.setNome("Guilherme Leandro");
        cliente.setCidade("Joinville");
        cliente.setEstado("Santa Catarina");
        cliente.setDataNascimento(new Date(2003,04,9));
        cliente.setSenha("panda@123");
        cliente.setEmail("guilherme@univille.br");
        cliente.setType("Client");
        service.addUsuario(cliente);

        var admin = new Usuario();
        admin.setNome("Admin");
        admin.setCidade("Joinville");
        admin.setEstado("Santa Catarina");
        admin.setDataNascimento(new Date(2003,04,9));
        admin.setSenha("admin@123");
        admin.setEmail("admin@admin.com");
        admin.setType("Admin");
        service.addUsuario(admin);
    }
}
