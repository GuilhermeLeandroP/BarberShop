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

    public List<Agendamentos> getAll() {
        return repository.findAll();
    }
}
