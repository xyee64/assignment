package com.secure.Security1.File;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.secure.Security1.response.MessageResponse;

@CrossOrigin("http://localhost:3000")
@RestController
//@RequestMapping(value="/data")
public class FileController {

	@Autowired
	private FileStorageService storageService;
	
	@PostMapping("/upload")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseFile uploadFile(@RequestParam ("file") MultipartFile file) {
		File fileName = storageService.store(file);
		
		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
				.path("/downloadFile/")
				.path(fileName.getId())
				.toUriString();
				
		return new ResponseFile(fileName.getId(),fileDownloadUri,file.getContentType(),file.getSize());
	}
	
	@GetMapping("/downloadFile/{fileName:.+}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity <Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request){
		File file = storageService.getFile(fileName);
		
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(file.getType()))
				.header(HttpHeaders.CONTENT_DISPOSITION,"attachement; filename=\""+file.getFilename()+"\"")
				.body(new ByteArrayResource(file.getFiles()));
	}
	
//	 @GetMapping("/files")
//	 @PreAuthorize("hasAuthority('ADMIN')")
//	  public ResponseEntity<List<ResponseFile>> getListFiles() {
//	    List<ResponseFile> files = storageService.getAllFiles().map(dbFile -> {
//	      String fileDownloadUri = ServletUriComponentsBuilder
//	          .fromCurrentContextPath()
//	          .path("/files/")
//	          .path(dbFile.getId())
//	          .toUriString();
//
//	      return new ResponseFile(
//	          dbFile.getFilename(),
//	          fileDownloadUri,
//	          dbFile.getType(),
//	          dbFile.getFiles().length);
//	    }).collect(Collectors.toList());
//
//	    return ResponseEntity.status(HttpStatus.OK).body(files);
//	  }
	 
	    @PostMapping("/uploadMultipleFiles")
	    @PreAuthorize("hasAuthority('ADMIN')")
	    public List <ResponseFile> uploadMultipleFiles(@RequestParam("multiplefile") MultipartFile[] files) {
	        return Arrays.asList(files)
	            .stream()
	            .map(file -> uploadFile(file))
	            .collect(Collectors.toList());
	    }
	
}
	
