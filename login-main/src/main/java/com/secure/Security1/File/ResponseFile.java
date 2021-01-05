package com.secure.Security1.File;

public class ResponseFile {

	private String fileName;
	private String fileDownloadUri;
	private String type;
	private long size;
	
	public ResponseFile(String fileName, String fileDownloadUri,String type, long size) {
		this.fileName = fileName;
		this.fileDownloadUri = fileDownloadUri;
		this.type = type;
		this.size = size;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFilesName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileDownloadUri() {
        return fileDownloadUri;
    }

	public void setFileDownloadUri(String fileDownloadUri) {
        this.fileDownloadUri = fileDownloadUri;
    }

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}
	
	
	
}
