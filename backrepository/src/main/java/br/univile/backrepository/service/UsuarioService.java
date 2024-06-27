package br.univile.backrepository.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.univile.backrepository.component.JwtTokenProvider;
import br.univile.backrepository.entity.Usuario;
import br.univile.backrepository.repository.UsuarioRepository;


@Service
public class UsuarioService {
    
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    public UsuarioService(UsuarioRepository usuarioRepository){
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> getUsuarios(){

        return usuarioRepository.findAll();

    }

    public Usuario getUsuariosId(long id){

        return usuarioRepository.findById(id);

    }

    public String addUsuario(Usuario usuario){

        String email = usuario.getEmail();
        Usuario user_found = usuarioRepository.findByEmail(email);
        
        if(user_found == null){
            usuarioRepository.save(usuario);
            return "Usuario cadastrado com sucesso! " + usuario.getDataNascimento(); 
        }else{
            throw new RuntimeException("Usuário já cadastrado no sistema!");
        }
        

    }

    public String authenticate(String email, String password){

        Usuario usuario = usuarioRepository.findByEmail(email);
        long id = usuario.getId();
        String type = usuario.getType();
        
        if(usuario != null && usuario.getSenha().equals(password)){
            return jwtTokenProvider.generateJwtToken(email, id, type); 
        }else{
            throw new RuntimeException("E-mail e senha informados não conferem");
        }

    }

    public String updateUsuario(Usuario usuario){

        long id = usuario.getId();
        Usuario usuarioDB = usuarioRepository.findById(id);

        if(usuarioDB != null){
            usuarioDB.setNome(usuario.getNome());
            usuarioDB.setDataNascimento(usuario.getDataNascimento());
            usuarioDB.setEmail(usuario.getEmail());
            usuarioDB.setCidade(usuario.getCidade());
            usuarioDB.setEstado(usuario.getEstado());
            usuarioDB.setSenha(usuario.getSenha());
            usuarioRepository.save(usuarioDB);
            return "Usuário atualizado com sucesso";
        }else{
            return "Usuário não encontrado";
        }

    }

}