# library_app
Simple library functions created with node and express


1) The first task of this node application is the ability to view the available booklist at the "library".

To access this, <b>send a get request to the "../books" </b>where "../" is the address of the homepage.
<br />
<br />

2) The second task is to view the users registered in the application

To access this, <b>send a get request to "../users" </b>
<br />
<br />

3) The third function is to create a user

To access this, <b>send a post request to "../users" and include a <u>name</u> value, and a <u>password</u> value in the body of the JSON object.</b>
  <br />
<br />
  
4) The fourth function is to checkout/checkin a rented book

To access this, <b>send a put request to "../checkout" or "../checkin" and include a <u>name</u> value, and a <u>books</u> value in the body of the JSON object. </b>The book value is the name of the book you want to check out, and the name value is the account the book is being loaned to. The application will notify you if the  the book is unavailable, or if the account does not have the book. 
  
 <br />
<br />

5) The fifth function is to view the information of a specific user

To access this, <b> send a get request to "../users/:name" where ":name" is the name of the user you are trying to access </b>. This will return the user information, including the password, name, and books currently checked out to the account. 
