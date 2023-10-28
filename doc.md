1. **Users Collection:**
   - Stores user account information.
   - Each document represents a user.
   - Example Fields:
     - `_id` (Automatically generated unique user ID)
     - `username`
     - `email`
     - `password` (hashed and salted)
     - `profilePicture`
     - `registrationDate`
     - `lastLoginDate`

2. **Mangas Collection:**
   - Stores information about manga series.
   - Each document represents a manga.
   - Example Fields:
     - `_id` (Automatically generated unique manga ID)
     - `title`
     - `description`
     - `coverImage`
     - `releaseDate`
     - `author` (Reference to the Users collection for the author)
     - `isNSFW` (Boolean to mark content as NSFW)

3. **Chapters Collection:**
   - Stores information about manga chapters.
   - Each document represents a manga chapter.
   - Example Fields:
     - `_id` (Automatically generated unique chapter ID)
     - `manga` (Reference to the Mangas collection for the manga series)
     - `title`
     - `chapterNumber`
     - `releaseDate`
     - `pages` (An array of image file URLs)

4. **Genres Collection:**
   - Stores information about manga genres.
   - Each document represents a genre.
   - Example Fields:
     - `_id` (Automatically generated unique genre ID)
     - `name`

5. **Tags Collection:**
   - Stores information about tags that can be associated with manga content.
   - Each document represents a tag.
   - Example Fields:
     - `_id` (Automatically generated unique tag ID)
     - `name`
     - `description`