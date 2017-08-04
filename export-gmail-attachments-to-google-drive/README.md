```
I wrote this script a while ago for my own use.
Basically, I have this huge chunk of emails (about a thousand)
at my gmail account, each one of them loaded with image
attachments. At first, I've tried to manually export the
images to Google Drive (through that button called "Save to
Drive") but, since it took me almost an hour to process only
two hundred of them, I decided to look somewhere else for a
solution. The thing is, there's a few options out there that
could do what I want, but poorly.

So I decided to do myself.

The solution is pretty simple. First, it loads a specific Google
Drive folder and starts to list every email that matches the
search. In my case, I've used the sender address and a specific
label. After that, the script get attachments for each email
and writes the BLOB in the folder loaded before.
```