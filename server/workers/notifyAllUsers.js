//one worker wakes up and gets directions for all users every five minutes?

//another worker wakes up and messages users half an hour before they need to leave...

//messaging worker should wakeup every minute and checks who needs to be messaged
//ticks a box when a user has been messaged for the morning and won't message them again...


//directions worker should check directions for all users starting up to two hours before they need to leave???
  //how to make this efficient...
  //user A
    //avg commute 45 mins
    //with bad traffic can be 75 mins
    //without any traffic can be 30 mins
    //arrive by 8a

    //need to start checking route time at least 75 mins before 8a
    //could stop checking after 30 mins before 8a

  //user B
    //avg commute 20 mins
    //with bad traffic can be 40 mins
    //without any traffic can be 15 mins
    //arrive by 8a

    //need to start checking route time at least 40 mins before 8a
    //could stop checking after 15 mins before 8a

  //user C
    //avg commute 90 mins
    //with bad traffic can be 150 mins
    //without any traffic can be 60 mins
    //arrive by 8a

    //need to start checking route time at least 150 mins before 8a
    //could stop checking after 60 mins before 8a