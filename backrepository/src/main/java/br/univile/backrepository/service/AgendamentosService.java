package br.univile.backrepository.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.univile.backrepository.entity.Agendamentos;
import br.univile.backrepository.repository.AgendamentosRepository;

@Service
public class AgendamentosService {
    @Autowired
    private AgendamentosRepository repository;
    
    public void save(Agendamentos Agendamentos) {
        repository.save(Agendamentos);
    }

    public Agendamentos getById(long id) {
        return repository.getById(id);
    }

    public void delete(Agendamentos barbeiro) {
        repository.delete(barbeiro);
    }

    public boolean isConflictingAgendamento(Agendamentos agendamentos) {
        List<Agendamentos> existingAgendamentos = repository.findByBarbeirosIdAndDataAndHora(
            agendamentos.getBarbeiros().getId(),
            agendamentos.getData(),
            agendamentos.getHora()
        );
        return !existingAgendamentos.isEmpty();
    }

    public List<Agendamentos> getAll() {
        return repository.findAll();
    }

    public List<Agendamentos> findByUsuarioId(long id) {
        return repository.findByUsuarioId(id);
    }
}
