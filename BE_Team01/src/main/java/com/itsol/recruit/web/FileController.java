package com.itsol.recruit.web;
import com.itsol.recruit.entity.Image;
import com.itsol.recruit.entity.ResponseObject;
import com.itsol.recruit.service.fileContact.IStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path="/api/FileUploading")
public class FileController {
    @Autowired
    private IStorageService iStorageService;

    @PostMapping("/create")
    public ResponseEntity<ResponseObject> uploadFile(@RequestParam("file") MultipartFile file,
                                                     @RequestParam ("username") String username){
        try {
            String generatedFileNamme = iStorageService.storeFile(file, username);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(HttpStatus.OK,"Upload file Successfully",generatedFileNamme)
            );
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject(HttpStatus.NOT_IMPLEMENTED,e.getMessage(),"")
            );
        }
//        c13d4d2bbfcb447aa634e619c7193fff
    }
    @GetMapping("/file/{fileName:.+}")
    public ResponseEntity<byte[]> readImageFile(@PathVariable String fileName){

        try {
            byte[] bytes = iStorageService.readFileContent(fileName);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(bytes);
        }catch (Exception e){
            return ResponseEntity.noContent().build();

        }
    }
    @GetMapping("")
    public ResponseEntity<ResponseObject> getUploaderFile(){
        try{
            List<String> urls = iStorageService.loadAll()
                    .map(path -> {
                        //convert fileName to url(send request readImageFile)
                        String urlPath = MvcUriComponentsBuilder.fromMethodName(FileController.class,
                                "readImageFile",path.getFileName().toString()).build().toUri().toString();
                        return urlPath;
                    })
                    .collect(Collectors.toList());
            return ResponseEntity.ok(new ResponseObject("List file successfully",urls));
        }catch (Exception e){
            return ResponseEntity.ok(
                    new ResponseObject("List file failed",new String[]{})
            );
        }
    }

    @GetMapping(value ="/Filename", produces="application/json")
    public Image getFilename(@RequestParam String username){
        return iStorageService.findFileByUserId(username);
    }


}
