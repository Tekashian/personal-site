# Setup Contact Form

The contact form uses Web3Forms (free service) to send emails directly to your inbox.

## How to get your Web3Forms Access Key:

1. Go to https://web3forms.com
2. Enter your email: jakub.grzegorz.lacki@gmail.com
3. Click "Get Access Key"
4. Check your email and copy the access key
5. Replace the placeholder key in `src/app/page.tsx` at line ~805:
   ```tsx
   <input type="hidden" name="access_key" value="YOUR_REAL_ACCESS_KEY_HERE" />
   ```

## Features:

- ✅ No backend needed
- ✅ Free (up to 250 submissions/month)
- ✅ Spam protection (honeypot field)
- ✅ Email notifications to jakub.grzegorz.lacki@gmail.com
- ✅ Success/Error messages
- ✅ Form validation
- ✅ Auto-reset after successful submission

## Alternative: Use EmailJS

If you prefer EmailJS:
1. Sign up at https://www.emailjs.com
2. Get your Service ID, Template ID, and Public Key
3. Update the code accordingly

The current setup is ready to work once you add your Web3Forms access key!
