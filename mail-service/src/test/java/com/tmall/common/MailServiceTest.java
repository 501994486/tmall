package com.tmall.common;


import com.tmall.mail.service.MailSendService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MailServiceTest {

    @Autowired
    private MailSendService mailService;

    @Test
    public void testSimpleMail() throws Exception {
    	//mailService.sendSimpleTextMail("501994486@qq.com","hello , simple mail subject "," hello, simple mail content");
    }
    
    @Test
    public void testHtmlMail() throws Exception {
        String content="<html>\n" +
                "<body>\n" +
                "    <h3>hello world ! 这是一封Html邮件!</h3>\n" +
                "</body>\n" +
                "</html>";
       // mailService.sendHtmlMail("501994486@qq.com","hello , html mail subject",content);
    }
    
    @Test
    public void sendInlineResourceMail() {
        String rscId = "neo006";       
        String content="<html><body>这是有图片的邮件：<img src=\'cid:" + rscId + "\' ></body></html>";
        String imgPath = "E:\\images\\asd.jpg";
       // mailService.sendInlineResourceMail("501994486@qq.com", "subject：这是有图片的邮件", content, imgPath, rscId);
    }
      
    @Test
    public void sendAttachmentsMail() {
        String filePath="E:\\images\\img01.jpg";
       // mailService.sendAttachmentsMail("501994486@qq.com", "主题：带附件的邮件", "有附件，请查收！", filePath);
    }
      
    @Test  
    public void sendFreemarkerEmailTemplate(){
    	mailService.sendEmailTemplate("501994486@qq.com", "hello , freemarker mail template", "zhangsan");
    }

}