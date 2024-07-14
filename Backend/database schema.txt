CREATE TABLE User (
    UserID INT PRIMARY KEY,
    Username VARCHAR(50) UNIQUE,
    Email VARCHAR(100) UNIQUE,
    Password VARCHAR(255),
    Name VARCHAR(100),
    Bio TEXT,
    ProfilePicture VARCHAR(255)
);


CREATE TABLE Post (
    PostID INT PRIMARY KEY,
    UserID INT,
    Content TEXT,
    MediaType VARCHAR(20),
    MediaURL VARCHAR(255),
    Timestamp TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);


CREATE TABLE Comment (
    CommentID INT PRIMARY KEY,
    PostID INT,
    UserID INT,
    Content TEXT,
    Timestamp TIMESTAMP,
    FOREIGN KEY (PostID) REFERENCES Post(PostID),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);


CREATE TABLE Like (
    LikeID INT PRIMARY KEY,
    PostID INT,
    CommentID INT,
    UserID INT,
    Timestamp TIMESTAMP,
    FOREIGN KEY (PostID) REFERENCES Post(PostID),
    FOREIGN KEY (CommentID) REFERENCES Comment(CommentID),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);


CREATE TABLE Friendship (
    FriendshipID INT PRIMARY KEY,
    UserID1 INT,
    UserID2 INT,
    Timestamp TIMESTAMP,
    FOREIGN KEY (UserID1) REFERENCES User(UserID),
    FOREIGN KEY (UserID2) REFERENCES User(UserID)
);


CREATE TABLE Message (
    MessageID INT PRIMARY KEY,
    SenderID INT,
    ReceiverID INT,
    Content TEXT,
    Timestamp TIMESTAMP,
    FOREIGN KEY (SenderID) REFERENCES User(UserID),
    FOREIGN KEY (ReceiverID) REFERENCES User(UserID)
);
