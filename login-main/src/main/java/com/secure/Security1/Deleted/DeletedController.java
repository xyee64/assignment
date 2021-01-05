package com.secure.Security1.Deleted;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class DeletedController {
	@Autowired
	private DeletedService deletedService;
	
	@RequestMapping("/deleted")
	@PreAuthorize("hasAuthority('ADMIN')")
	public Iterable<Deleted> getAllDeleted()  {
			return  deletedService.findAll();
		
	}
	
	@RequestMapping(method=RequestMethod.POST,value="/deleted")
	@PreAuthorize("hasAuthority('ADMIN')or hasAuthority('USER')")
	public void addDeleted(@RequestBody Deleted deleted) {
		deletedService.save(deleted);
	}
}
