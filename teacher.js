

//add information of new class
const createClassForm = document.querySelector("#createClassForm");
createClassForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selYear = document.getElementById("yearList");
    const selSemester = document.getElementById("semesterList");
    const user = auth.currentUser.uid;
    const classTitle = createClassForm['inputClassTitle'].value;
    const date = createClassForm['datepicker'].value;
    const classYear = selYear.options[selYear.selectedIndex].value;
    const classSemester = selSemester.options[selSemester.selectedIndex].value;
    var newClassKey = database.ref().child('Classes').push().key;
    database.ref('Classes/' + newClassKey).set({
        Title: classTitle,
        Year: classYear,
        Semester: classSemester,
        Teacher: user,
        Date: date
    }).then(() => {
        const queryStudent = database.ref('Students');
        queryStudent.once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                const studentSemester = childSnapshot.child("Semester").val();
                const studentYear = childSnapshot.child("Year").val();
                if (classSemester == studentSemester && classYear == studentYear) {
                    database.ref('Classes/' + newClassKey + '/Students').push(childSnapshot.key)
                }
            });
        })
        $('#modalCreateClass').modal('hide');
        createClassForm.reset();
    }).catch(err => {
        console.log(err.message);
    });
})

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

function selectChange() {
    var sel = document.getElementById("postTypeList");
    var fileOption = document.getElementById("fileSelectionId");
    var value = sel.options[sel.selectedIndex].value; // or just sel.value
    if (value == 'Text') {
        fileOption.style.display = "none";
    } else if (value == 'Assigment') {
        fileOption.style.display = "block";
    } else {
        fileOption.style.display = "block";
    }
}

$("#datepicker").datepicker({
    format: " yyyy", // Notice the Extra space at the beginning
    viewMode: "years",
    minViewMode: "years",
    autoClose: true,
}).on('changeDate', function (ev) {
    $('#datepicker').datepicker('hide');
});
