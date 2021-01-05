package com.secure.Security1.forgotpass;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.secure.Security1.model.User;

import net.bytebuddy.utility.RandomString;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class ForgotPasswordController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private JavaMailSender mailSender;

	
	@PostMapping("/forgot_password")
	public String processForgotPasswordForm(HttpServletRequest request,Model model) {
		String email = request.getParameter("email");
		String token = RandomString.make(45);
		
		try {
			userService.updateResetPasswordToken(token, email);
			
			String resetPasswordLink= Utility.getSiteURL(request)+"/reset_password?token=" +token;
			
			sendEmail(email,resetPasswordLink);
			
			model.addAttribute("message", "We have sent a reset password link");
			
		} catch (UserNotFoundException ex) {
			model.addAttribute("error", ex.getMessage());
		} catch (UnsupportedEncodingException | MessagingException e) {
			model.addAttribute("error", "Error while sending email.");
		} 
		
		
		return("ForgotPassword");
		
	}


	private void sendEmail(String email, String resetPasswordLink) throws UnsupportedEncodingException, MessagingException {
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		
		helper.setFrom("contact@sicmsb.com","SICMSB Support");
		helper.setTo(email);
		
		String subject = "Here's the link to reset your password";
		
		String content = "<p>Hello,</p>"
				+ "<p>You Have requested to reset your password</p>"
				+ "<p>Click the link below to change your password:</p>"
				+ "<p><b><a href=\"" +resetPasswordLink + "\">Change my password</a><b></p>"
				+ "<p>Igonore this email if you do remember your password, or you have not made the request</p>";
		
		helper.setSubject(subject);
		helper.setText(content,true);
		
		mailSender.send(message);
	}
	
	@GetMapping("/reset_password")
	public String showResetPasswordForm(@Param(value="token") String token,
			Model model) {
		User user = userService.getByResetPasswordToken(token);
		if(user == null) {
			model.addAttribute("title","Reset your password");
			model.addAttribute("message","Invalid Token");
			return "message";
		}else if(user.getExpiryDate().isBefore(LocalDateTime.now())) {
			model.addAttribute("message", "Token Expired. Please request an email again");
			return "message";
		}else {
			model.addAttribute("token",token);
			model.addAttribute("page title","Reset your password");
		}
		
		return"ResetPassword";
	}

	@PostMapping("/reset_password")
	public String processResetPassword(HttpServletRequest request, Model model) {
		String token = request.getParameter("token");
		String password = request.getParameter("password");
		
		User user = userService.getByResetPasswordToken(token);
		
		if(user == null) {
			model.addAttribute("title","Reset your password");
			model.addAttribute("message","Invalid Token");
			return "message";
		}	
		else {
			userService.updatePassword(user, password);
			model.addAttribute("message","You have successfully changed your password.");
		}
		
		return"message";
	}
	
	@PostMapping("/change_password")
	@PreAuthorize("hasAuthority('ADMIN')or hasAuthority('USER')")
	public String changePassword(HttpServletRequest request, Model model) {
		String password = request.getParameter("password");
		String username = request.getParameter("username");
		
		User user = userService.getByUsername(username);
		
		if(user == null) {
			model.addAttribute("message","Wrong");
			return "message";
		}	
		else {
			userService.changePassword(user, password);
			model.addAttribute("message","You have successfully changed your password.");
		}
		
		return"message";
	}
}
