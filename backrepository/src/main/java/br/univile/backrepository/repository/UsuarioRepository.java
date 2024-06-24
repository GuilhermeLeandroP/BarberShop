package br.univile.backrepository.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.univile.backrepository.entity.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{

    Usuario findByNome(String nome);
    Usuario findByEmail(String email);
    Usuario findById(long id);
}