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