# Lab 8 - Starter

Aadit Agarwal

1) Where would you fit your automated tests in your Recipe project development pipeline? Select one of the following and explain why.
- Within a Github action that runs whenever code is pushed. Running automated tests within a Github action that triggers whenever code is pushed is the ideal option for integrating automated testing into the Recipe project development pipeline. 

2) Would you use an end to end test to check if a function is returning the correct output? (yes/no)
- No, an end-to-end test is not suitable for checking if a function is returning the correct output. Unit tests are the appropriate choice for that purpose.

3) Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
- No, a unit test would not be suitable for testing the "message" feature of a messaging application as it involves the interaction of multiple components and requires end-to-end testing to validate its functionality and behavior.

4) Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters.
- Yes, a unit test would be suitable for testing the "max message length" feature of a messaging application. This feature can be tested independently by writing unit tests that validate whether the application correctly restricts the user from typing more than 80 characters and ensures that longer messages are appropriately handled.


![image](https://github.com/aaadit24/Lab8_Starter/assets/97692709/f24726c8-2ed4-4b60-9939-aa33db21b22f)
