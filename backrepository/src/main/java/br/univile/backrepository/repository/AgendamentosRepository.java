package br.univile.backrepository.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.univile.backrepository.entity.Agendamentos;

@Repository
public interface AgendamentosRepository extends JpaRepository<Agendamentos, Integer>{

    Agendamentos getById(long id);
}