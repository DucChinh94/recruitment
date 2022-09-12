package com.itsol.recruit.service.fileContact;

import com.itsol.recruit.entity.Image;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface IStorageService {
    public String storeFile(MultipartFile file,String username);
    public Stream<Path> loadAll();
    public byte[] readFileContent(String fileName);
    public  void deleteAllFile();

    Image findFileByUserId(String username);
}