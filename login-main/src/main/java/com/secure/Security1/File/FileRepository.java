package com.secure.Security1.File;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.secure.Security1.model.User;

@Repository
public interface FileRepository extends JpaRepository<File, String>{


}
