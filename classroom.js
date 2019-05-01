window.onload = function () {
    loadPost();
};

function loadPost() {
    var id = localStorage.getItem("classRoomId");
    const queryClass = database.ref('Classes/' + id);
    queryClass.once('value').then(function (snapshot) {
        const classTitle = snapshot.child('Title').val();
        const classYear = snapshot.child('Year').val();
        var classYearText, classSemesterText;
        var childKey = snapshot.key;
        const classSemester = snapshot.child('Semester').val();

        if (classYear == '1') {
            classYearText = 'First Year ';
        } else if (classYear == '2') {
            classYearText = 'Second Year ';
        } else if (classYear == '3') {
            classYearText = 'Third Year ';
        } else if (classYear == '4') {
            classYearText = 'Fourth Year ';
        } else if (classYear == '5') {
            classYearText = 'Masters ';
        }
        if (classSemester == '1') {
            classSemesterText = 'First Semester ';
        } else if (classSemester == '2') {
            classSemesterText = 'Second Semester ';
        }
        console.log(classTitle);
        console.log(classSemester);
        console.log(classYear);
        document.getElementById('classroomTitle').innerHTML = classTitle;
        document.getElementById('classroomDes').innerHTML = classSemesterText + ' ' + classYearText;

    })

}

//create post
const createPostForm = document.querySelector("#createPostForm");
createPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    const postTitle = createPostForm['inputPostTitle'].value;
    const postDate = dateTime;
    const postText = createPostForm['inputPostText'].value;
    var classId = localStorage.getItem("classRoomId");
    database.ref('Classes/' + classId + '/Posts');
    var newPostKey = database.ref().child('Classes/' + classId + '/Posts').push().key;
    database.ref('Classes/' + classId + '/Posts/' + newPostKey).set({
        Title: postTitle,
        Time: postDate,
        Text: postText
    }).then(() => {
        $('#modalCreatePost').modal('hide');
        createPostForm.reset();
    }).catch(err => {
        console.log(err.message);
    });

})

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        const user = auth.currentUser.uid;
        database.ref('Users/' + user).once('value').then(function (snapShot) {
            const userInfo = snapShot.val().UserType;
            var x = document.getElementById("createPostButton");
            if (userInfo == 'Teacher') {
                console.log('called');
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
        })
    } else {
        // No user is signed in.
    }
});


