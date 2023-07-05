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

5. Test to see if your photos and bios are rendering correctly by running `npm start` in the root directory and navigating to `localhost:8080` in your browser.

#

**To update the Amazon S3 bucket, follow the below steps:**

1. Run `npm run build` so webpack bundles the new code.
2. Log into the Amazon S3 bucket using the credentials in our Chronos credientials sheet.
3. Open the S3 bucket, then click the **chronoslany.com** bucket (should be listed with an Access of **Public**)
   - Save a copy of the existing `bundle.js` and `index.html` just in case.
4. Delete existing `bundle.js` and `index.html` from the bucket.
5. Upload the new bundled `bundle.js` and `index.html` (located in `./dist`), as well as your photos with the uglified names.

_Note: The website will take around 24 hours to update with your changes._
