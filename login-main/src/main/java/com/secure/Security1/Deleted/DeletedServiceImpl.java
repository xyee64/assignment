package com.secure.Security1.Deleted;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service("deletedService")
public class DeletedServiceImpl implements DeletedService  {
	@Autowired
	private DeletedRepository deletedRepository;

	@Override
	public Iterable<Deleted> findAll() {
		return deletedRepository.findAll();
	}

	@Override
	public Deleted save(Deleted deleted) {
		return deletedRepository.save(deleted);
	}
}
