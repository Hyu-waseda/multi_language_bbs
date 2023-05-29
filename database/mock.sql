INSERT INTO Users (Username, Email, Password)
VALUES
  ('user1', 'user1@example.com', 'password1'),
  ('user2', 'user2@example.com', 'password2'),
  ('user3', 'user3@example.com', 'password3');

INSERT INTO Threads (Title, CreatedAt, UpdatedAt, UserID, Content, Language, Views, Likes, Tags, CategoryID, ImageURL)
VALUES
  ('Thread 1', '2023-05-01 12:34:56', '2023-05-02 09:12:34', 1, 'This is the content of Thread 1.', 'en', 10, 5, 'tag1, tag2', 1, 'image1.jpg'),
  ('Thread 2', '2023-05-03 10:20:30', '2023-05-04 15:45:12', 2, 'Content for Thread 2 goes here.', 'ja', 5, 3, 'tag3, tag4', 2, 'image2.jpg'),
  ('Thread 3', '2023-05-05 08:15:30', '2023-05-06 11:30:45', 1, 'The third thread with some text.', 'en', 2, 1, 'tag5, tag6', 1, 'image3.jpg'),
  ('Thread 4', '2023-05-07 14:00:00', '2023-05-08 16:30:00', 3, 'Content of Thread 4 goes here.', 'en', 8, 2, 'tag7, tag8', 3, 'image4.jpg'),
  ('Thread 5', '2023-05-09 09:45:00', '2023-05-10 11:20:00', 2, 'This is the content for Thread 5.', 'ja', 12, 6, 'tag9, tag10', 1, 'image5.jpg'),
  ('Thread 6', '2023-05-11 17:30:00', '2023-05-12 13:40:00', 1, 'Content of the sixth thread.', 'en', 3, 1, 'tag11, tag12', 2, 'image6.jpg'),
  ('Thread 7', '2023-05-13 08:00:00', '2023-05-14 10:15:00', 3, 'This is the content for Thread 7.', 'ja', 6, 4, 'tag13, tag14', 1, 'image7.jpg'),
  ('Thread 8', '2023-05-15 11:30:00', '2023-05-16 14:50:00', 2, 'Eighth thread content goes here.', 'en', 9, 3, 'tag15, tag16', 3, 'image8.jpg'),
  ('Thread 9', '2023-05-17 16:20:00', '2023-05-18 09:10:00', 1, 'This is the content of Thread 9.', 'ja', 7, 2, 'tag17, tag18', 1, 'image9.jpg'),
  ('Thread 10', '2023-05-19 10:00:00', '2023-05-20 12:30:00', 3, 'Content for the tenth thread.', 'en', 5, 1, 'tag19, tag20', 2, 'image10.jpg'),
  ('Thread 11', '2023-05-21 13:45:00', '2023-05-22 15:20:00', 2, 'This is the content for Thread 11.', 'ja', 10, 7, 'tag21, tag22', 1, 'image11.jpg'),
  ('Thread 12', '2023-05-23 09:30:00', '2023-05-24 11:00:00', 1, 'Content of the twelfth thread.', 'en', 4, 2, 'tag23, tag24', 3, 'image12.jpg'),
  ('Thread 13', '2023-05-25 14:00:00', '2023-05-26 16:45:00', 3, 'This is the content for Thread 13.', 'ja', 8, 5, 'tag25, tag26', 2, 'image13.jpg'),
  ('Thread 14', '2023-05-27 11:10:00', '2023-05-28 13:20:00', 2, 'Content for the fourteenth thread goes here.', 'en', 6, 3, 'tag27, tag28', 1, 'image14.jpg'),
  ('Thread 15', '2023-05-29 15:30:00', '2023-05-30 09:40:00', 1, 'This is the content of Thread 15.', 'ja', 11, 8, 'tag29, tag30', 3, 'image15.jpg'),
  ('Thread 16', '2023-05-31 10:50:00', '2023-06-01 12:15:00', 3, 'Content of the sixteenth thread.', 'en', 7, 2, 'tag31, tag32', 2, 'image16.jpg'),
  ('Thread 17', '2023-06-02 13:00:00', '2023-06-03 15:10:00', 2, 'This is the content for Thread 17.', 'ja', 9, 4, 'tag33, tag34', 1, 'image17.jpg'),
  ('Thread 18', '2023-06-04 08:20:00', '2023-06-05 10:30:00', 1, 'Content for the eighteenth thread goes here.', 'en', 5, 1, 'tag35, tag36', 3, 'image18.jpg'),
  ('Thread 19', '2023-06-06 11:40:00', '2023-06-07 14:00:00', 3, 'This is the content of Thread 19.', 'ja', 10, 6, 'tag37, tag38', 2, 'image19.jpg'),
  ('Thread 20', '2023-06-08 09:50:00', '2023-06-09 12:00:00', 2, 'Content of the twentieth thread.', 'en', 3, 1, 'tag39, tag40', 1, 'image20.jpg');

INSERT INTO Comments (ThreadID, UserID, Content, CreatedAt, UpdatedAt, Likes)
VALUES
  (1, 1, 'Comment 1 for Thread 1.', '2023-05-01 14:00:00', '2023-05-01 14:30:00', 2),
  (1, 2, 'Another comment for Thread 1.', '2023-05-01 15:00:00', '2023-05-01 15:15:00', 1),
  (2, 1, 'Comment for Thread 2.', '2023-05-03 11:00:00', '2023-05-03 11:10:00', 3),
  (2, 2, 'This is a reply to the previous comment.', '2023-05-03 11:30:00', '2023-05-03 11:35:00', 1),
  (3, 1, 'Comment for Thread 3.', '2023-05-05 09:00:00', '2023-05-05 09:05:00', 1),
  (3, 2, 'Another comment for Thread 3.', '2023-05-05 09:30:00', '2023-05-05 09:35:00', 2),
  (4, 1, 'Comment for Thread 4.', '2023-05-07 14:30:00', '2023-05-07 14:45:00', 1),
  (4, 2, 'A reply to the previous comment for Thread 4.', '2023-05-07 15:00:00', '2023-05-07 15:05:00', 1),
  (5, 1, 'Comment for Thread 5.', '2023-05-09 10:15:00', '2023-05-09 10:30:00', 3),
  (5, 2, 'Another comment for Thread 5.', '2023-05-09 11:00:00', '2023-05-09 11:15:00', 2),
  (6, 1, 'Comment for Thread 6.', '2023-05-11 17:45:00', '2023-05-11 18:00:00', 1),
  (6, 2, 'This is a reply to the previous comment for Thread 6.', '2023-05-11 18:15:00', '2023-05-11 18:20:00', 1),
  (7, 1, 'Comment for Thread 7.', '2023-05-13 08:30:00', '2023-05-13 08:45:00', 2),
  (7, 2, 'Another comment for Thread 7.', '2023-05-13 09:00:00', '2023-05-13 09:15:00', 3),
  (8, 1, 'Comment for Thread 8.', '2023-05-15 11:45:00', '2023-05-15 12:00:00', 1),
  (8, 2, 'A reply to the previous comment for Thread 8.', '2023-05-15 12:15:00', '2023-05-15 12:20:00', 1),
  (9, 1, 'Comment for Thread 9.', '2023-05-17 16:30:00', '2023-05-17 16:45:00', 2),
  (9, 2, 'Another comment for Thread 9.', '2023-05-17 17:00:00', '2023-05-17 17:15:00', 1),
  (10, 1, 'Comment for Thread 10.', '2023-05-19 10:30:00', '2023-05-19 10:45:00', 1),
  (10, 2, 'A reply to the previous comment for Thread 10.', '2023-05-19 11:00:00', '2023-05-19 11:05:00', 2),
  (11, 1, 'Comment for Thread 11.', '2023-05-21 14:00:00', '2023-05-21 14:15:00', 3),
  (11, 2, 'Another comment for Thread 11.', '2023-05-21 14:30:00', '2023-05-21 14:45:00', 1),
  (12, 1, 'Comment for Thread 12.', '2023-05-23 09:45:00', '2023-05-23 10:00:00', 2),
  (12, 2, 'This is a reply to the previous comment for Thread 12.', '2023-05-23 10:15:00', '2023-05-23 10:20:00', 1),
  (13, 1, 'Comment for Thread 13.', '2023-05-25 14:30:00', '2023-05-25 14:45:00', 3),
  (13, 2, 'Another comment for Thread 13.', '2023-05-25 15:00:00', '2023-05-25 15:15:00', 2),
  (14, 1, 'Comment for Thread 14.', '2023-05-27 11:30:00', '2023-05-27 11:45:00', 1),
  (14, 2, 'A reply to the previous comment for Thread 14.', '2023-05-27 12:00:00', '2023-05-27 12:05:00', 1),
  (15, 1, 'Comment for Thread 15.', '2023-05-29 15:45:00', '2023-05-29 16:00:00', 3),
  (15, 2, 'Another comment for Thread 15.', '2023-05-29 16:15:00', '2023-05-29 16:30:00', 2),
  (16, 1, 'Comment for Thread 16.', '2023-05-31 11:00:00', '2023-05-31 11:15:00', 1),
  (16, 2, 'This is a reply to the previous comment for Thread 16.', '2023-05-31 11:30:00', '2023-05-31 11:35:00', 1),
  (17, 1, 'Comment for Thread 17.', '2023-06-02 13:30:00', '2023-06-02 13:45:00', 2),
  (17, 2, 'Another comment for Thread 17.', '2023-06-02 14:00:00', '2023-06-02 14:15:00', 3),
  (18, 1, 'Comment for Thread 18.', '2023-06-04 08:35:00', '2023-06-04 08:50:00', 1),
  (18, 2, 'A reply to the previous comment for Thread 18.', '2023-06-04 09:00:00', '2023-06-04 09:05:00', 1),
  (19, 1, 'Comment for Thread 19.', '2023-06-06 12:00:00', '2023-06-06 12:15:00', 3),
  (19, 2, 'Another comment for Thread 19.', '2023-06-06 12:30:00', '2023-06-06 12:45:00', 2),
  (19, 1, 'Comment for Thread 20.', '2023-06-08 10:00:00', '2023-06-08 10:15:00', 1),
  (19, 2, 'This is a reply to the previous comment for Thread 20.', '2023-06-08 10:30:00', '2023-06-08 10:35:00', 1),
  (19, 3, 'Yet another comment for Thread 20.', '2023-06-08 10:45:00', '2023-06-08 11:00:00', 2),
  (20, 1, 'Comment for Thread 20.', '2023-06-08 10:00:00', '2023-06-08 10:15:00', 1),
  (20, 2, 'This is a reply to the previous comment for Thread 20.', '2023-06-08 10:30:00', '2023-06-08 10:35:00', 1),
  (20, 3, 'Yet another comment for Thread 20.', '2023-06-08 10:45:00', '2023-06-08 11:00:00', 2),
  (20, 1, 'One more comment for Thread 20.', '2023-06-08 11:15:00', '2023-06-08 11:30:00', 3),
  (20, 2, 'Yet another reply to the previous comment for Thread 20.', '2023-06-08 11:45:00', '2023-06-08 11:50:00', 1),
  (20, 3, 'Final comment for Thread 20.', '2023-06-08 12:00:00', '2023-06-08 12:15:00', 2);