package br.univile.backrepository.repository;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.univile.backrepository.entity.Agendamentos;

@Repository
public interface AgendamentosRepository extends JpaRepository<Agendamentos, Integer>{

    Agendamentos getById(long id);
    
    List<Agendamentos> findByUsuarioId(Long id);
    
    List<Agendamentos> findByBarbeirosIdAndDataAndHora(Long barbeiroId, Date data, String hora);

}