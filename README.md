# Instructions

**To update the file, follow the below steps:**

1. Switch to the `chronosWebsite` branch.
2. Within `./client/assets`, upload your photos and follow the below naming convention:
   - `Bio_picture_NAME`
3. Within `./client/components/pages/Team.jsx`, import your photos at the top with the naming convention:
   - `bioNAMEPic`
4. Add your bios to the `bios` array with the below format:

```
    {
        name: 'NAME',
        bioParagraph: 'bioparagraphtext',
        picture: bioNAMEPic,
        contact: {
            gitHub: 'github link',
            linkedIn: 'linkedin link',
        },
    }
```

5. Test to see if your photos and bios are rendering correctly by running `npm start` in the root directory and navigating to `localhost:8081` in your browser.

#

**To update the Amazon S3 bucket, follow the below steps:**

1. Run `npm run build` so webpack bundles the new code.
2. Log into the Amazon S3 bucket using the credentials in our Chronos credientials sheet.
3. On the main aws page, in console home, click on the green S3 logo. 
4. In the amazon S3 page, click the **chronoslany.com** bucket (should be listed with an Access of **Public**). Make sure you use the bucket labeled 'chronoslany.com' or else the website will not update. It has a creation date of May, 26, 2020. YOU DO NOT NEED TO MAKE A NEW BUCKET. 
5. Select all, click on the actions dropdown and click copy. Save a copy of the existing `bundle.js` and `index.html` just in case. Follow the naming rules directed by amazon, but don't change any of the settings. Save the copy. 
4. After saving the copy, go back to the S3 home, select **chronoslany.com** again.
5. select all objects and delete from the bucket.
5. Upload the new bundled `bundle.js` and `index.html` (located in `./dist`), as well as your photos with the uglified names. Basically open the folders in a GUI and copy paste all the files in './dist' into the aws upload module. 
6. You should be good to go!!!! However, because the website caches, you may need to visit from another browser or incognito mode to see changes. It might not take 24 hours, but give it a few minutes before checking. Make sure to use a different browser as previously stated.  

_Note: The website will take around 24 hours to update with your changes._
