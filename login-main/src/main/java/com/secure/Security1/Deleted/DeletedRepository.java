package com.secure.Security1.Deleted;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
@Repository("deletedRepository")
public interface DeletedRepository extends CrudRepository<Deleted, Integer > {

}
