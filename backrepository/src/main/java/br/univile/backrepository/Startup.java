package br.univile.backrepository;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import br.univile.backrepository.entity.Barbeiros;
import br.univile.backrepository.entity.Usuario;
import br.univile.backrepository.service.BarbeirosService;
import br.univile.backrepository.service.UsuarioService;


@Component
public class Startup {
    @Autowired
    private UsuarioService service;

    @Autowired
    private BarbeirosService service2;

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
        admin.setFoto("https://t3.ftcdn.net/jpg/02/01/98/38/360_F_201983821_GxMwXoT1dzcAeuZtBLVXvEDmWZ0ee3Rl.webp");
        admin.setCidade("Joinville");
        admin.setEstado("Santa Catarina");
        admin.setDataNascimento(new Date(2003,04,9));
        admin.setSenha("admin");
        admin.setEmail("admin");
        admin.setType("Admin");
        service.addUsuario(admin);

        var barbeiro1 = new Barbeiros();
        barbeiro1.setNome("Robson da Silva Junior");
        barbeiro1.setEmail("robsonbarbeiro@gmail.com");
        barbeiro1.setFoto("https://img.freepik.com/fotos-gratis/barbeiro-de-avental-indo-fazer-a-barba-segurando-uma-navalha-parecendo-confiante-em-pe-sobre-o-branco_141793-109292.jpg?size=626&ext=jpg&ga=GA1.1.1633619936.1719624154&semt=ais_user");
        barbeiro1.setAnosExp(10);
        service2.save(barbeiro1);

        var barbeiro2 = new Barbeiros();
        barbeiro2.setNome("Rafael Luiz da Silva");
        barbeiro2.setEmail("rafaelbarbeiro@gmail.com");
        barbeiro2.setFoto("https://img.freepik.com/fotos-premium/homem-adulto-sentindo-se-enojado-e-irritado-mostrando-a-lingua-nao-gostando-de-algo-nojento-e-nojento_1194-198631.jpg?w=1380");
        barbeiro2.setAnosExp(7);
        service2.save(barbeiro2);

        var barbeiro3 = new Barbeiros();
        barbeiro3.setNome("Alexandre dos Santos");
        barbeiro3.setEmail("alexandrecortacabelo@hotmail.com");
        barbeiro3.setFoto("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfeA3k4Bg1P3PTqbrkvo3TcjEcC5fc82k4nA&s");
        barbeiro3.setAnosExp(2);
        service2.save(barbeiro3);

    }
}
