package com.secure.Security1.File;

import java.io.IOException;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

	@Autowired
	private FileRepository fileRepository;
	
	public File store(MultipartFile file) {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		try {
			if(fileName.contains("..")) {
				throw new FileStorageException("Sorry,filename contains invalid path sequence"+fileName);
				
			}
		
		File File = new File(fileName, file.getContentType(),file.getBytes());
		
		return fileRepository.save(File);
	}
	catch (IOException ex) {
		throw new FileStorageException("Could not store file" +fileName+".Please try again",ex);
		}
	}
	
    public File getFile(String fileId) {
        return fileRepository.findById(fileId)
        		.orElseThrow(() -> new FileNotFoundException("File not found with id"+fileId));
    }
	

//	public File store(MultipartFile file) throws IOException {
//	    String fileName = StringUtils.cleanPath(file.getOriginalFilename());
//	    File File = new File(fileName, file.getContentType(), file.getBytes());
//
//	    return fileRepository.save(File);
//	}
//	  
//	public File getFile(String fileId) {
//		return fileRepository.findById(fileId)
//				.orElseThrow(()-> new FileNotFoundException("File not found with id" + fileId));
//		}
//	
//	  public Stream<File> getAllFiles() {
//		    return fileRepository.findAll().stream();
//		  }
	}
