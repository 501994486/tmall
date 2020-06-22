package com.tmall.mail.service;

import freemarker.template.Configuration;
import freemarker.template.Template;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MailSendServiceImpl implements MailSendService {

	 @Autowired 
	private Configuration configuration;// freemarker
	
    @Autowired
    private JavaMailSender mailSender;

    @Value("${mail.fromMail.addr}")
    private String from2;

    
    /**
     * 发送包含简单文本的邮件
     */
    @Override
    public void sendSimpleTextMail(String from,String to, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);

        try {
            mailSender.send(message);
            System.out.println("简单邮件已经发送。");
        } catch (Exception e) {
        	System.out.println(e);
            System.out.println("发送简单邮件时发生异常！");
        }

    }
    
    /**
     * 发送包含HTML文本的邮件
     */
    @Override
    public void sendHtmlMail(String from,String to, String subject, String content) {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
        	 helper.setFrom(from);
             helper.setTo(to);
             helper.setSubject(subject);
             helper.setText(content, true);//true表示启用html
            mailSender.send(message);
            System.out.println("成功发送html邮件");
           
        } catch (MessagingException e) {
        	System.out.println(e);
        	System.out.println("发送html邮件时发生异常！");
        }
    }
    
    
    /**
     * 发送包含图片(静态资源)的邮件（需要使用信用高的邮箱，否则报错）
     * 554 DT:SPM 发送的邮件内容包含了未被许可的信息，或被系统识别为垃圾邮件。
     * 请检查是否有用户发送病毒或者垃圾邮件
     *现在一般不会做内嵌图片，因为这样邮件会很大，容易对服务器造成压力，一般做法是使用图片链接
     */
    @Override
    public void sendInlineResourceMail(String from,String to, String subject, String content, String rscPath, String rscId){
        MimeMessage message = mailSender.createMimeMessage();
        try {
        	 //true表示邮件是multipart模式
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true);

            FileSystemResource res = new FileSystemResource(new File(rscPath));
            helper.addInline(rscId, res);

            mailSender.send(message);
           System.out.println("图片静态资源的邮件已经发送。");
        } catch (MessagingException e) {
        	System.out.println(e);
            System.out.println("发送图片静态资源的邮件时发生异常！");
        }
    }
    
    /**
     * 发送包含附件的邮件
     * @throws Exception
     */
    @Override
    public void sendAttachmentsMail(String from,String to, String subject, String content, List<String> filePathList){
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true);

            for(String filePath : filePathList){
                FileSystemResource file = new FileSystemResource(new File(filePath));
                String fileName = filePath.substring(filePath.lastIndexOf(File.separator));
                helper.addAttachment(fileName, file);
            }

            mailSender.send(message);
            System.out.println("带附件的邮件已经发送。");
        } catch (MessagingException e) {
        	System.out.println(e);
            System.out.println("发送带附件的邮件时发生异常！");
        }
    }
    
    @Override 
    public void sendEmailTemplate(String to, String subject,String name){
        MimeMessage message =mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper( message,true);
            helper.setFrom(from2);
            helper.setTo(to);
            helper.setSubject(subject);

            Map<String, Object> model = new HashMap();
            model.put("name", name);     
            Template template = configuration.getTemplate("emailTemplate.html");
            String content = FreeMarkerTemplateUtils.processTemplateIntoString(template,model);
            helper.setText(content,true);
           
            mailSender.send(message);
            System.out.println("邮件发送成功");
        } catch (MessagingException e) {
            e.printStackTrace();
            System.out.println("邮件发送失败");
        }catch (Exception e) {
            e.printStackTrace();
            System.out.println("邮件发送失败");
        }
    }
    

}
