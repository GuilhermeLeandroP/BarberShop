package br.univile.backrepository.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.univile.backrepository.entity.Barbeiros;
import br.univile.backrepository.repository.BarbeirosRepository;

@Service
public class BarbeirosService {
    
    @Autowired
    private BarbeirosRepository repository;
    
    public void save(Barbeiros Barbeiros) {
        repository.save(Barbeiros);
    }

    public Barbeiros getById(long id) {
        return repository.getById(id);
    }

    public void delete(Barbeiros barbeiro) {
        repository.delete(barbeiro);
    }

    public List<Barbeiros> getAll() {
        return repository.findAll();
    }
    
}
