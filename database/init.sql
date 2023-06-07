CREATE TABLE IF NOT EXISTS Threads (
  ThreadID INT PRIMARY KEY AUTO_INCREMENT,
  Title VARCHAR(255),
  CreatedAt TIMESTAMP,
  UpdatedAt TIMESTAMP,
  UserID INT,
  UserName VARCHAR(255),
  Content LONGTEXT,
  Language VARCHAR(2),
  Views INT,
  Likes INT,
  Tags VARCHAR(255),
  CategoryID INT,
  ImageURL VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Comments (
  CommentID INT PRIMARY KEY AUTO_INCREMENT,
  ThreadID INT,
  UserID INT,
  UserName VARCHAR(255),
  Content TEXT,
  CreatedAt TIMESTAMP,
  UpdatedAt TIMESTAMP,
  Likes INT,
  FOREIGN KEY (ThreadID) REFERENCES Threads(ThreadID)
);
