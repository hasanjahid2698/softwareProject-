

const signUpFormAdmin = document.querySelector('#adminForm');
if (signUpFormAdmin) {
    signUpFormAdmin.addEventListener('submit', e => {
        e.preventDefault();
        //get User information
        const name = signUpFormAdmin['inputName'].value;
        const email = signUpFormAdmin['inputEmail'].value;
        const password = signUpFormAdmin['inputPassword'].value;
        const confirmPassword = signUpFormAdmin['inputConfirmPassword'].value;
        const messageField = document.getElementById('adminMessage');
        if (password == confirmPassword) {
            auth.createUserWithEmailAndPassword(email, password).then(cred => {
                console.log(cred);
                signUpFormAdmin.reset();
                database.ref('Users/' + cred.user.uid).set({
                    UserType: "Admin",
                });
                database.ref('Admins/' + cred.user.uid).set({
                    Name: name,
                    Email: email
                }).then(() => {
                    location.href = 'index.html'
                })
            })
        } else {
            messageField.style.color = 'red';
            messageField.innerHTML = 'password is not matching';
        }


    })
}

const signUpFormTeacher = document.querySelector('#teacherForm');
if (signUpFormTeacher) {
    signUpFormTeacher.addEventListener('submit', e => {
        e.preventDefault();

        //get User information
        const name = signUpFormTeacher['inputName'].value;
        const email = signUpFormTeacher['inputEmail'].value;
        const password = signUpFormTeacher['inputPassword'].value;
        const confirmPassword = signUpFormTeacher['inputConfirmPassword'].value;

        const messageField = document.getElementById('teacherMessage');
        if (password == confirmPassword) {
            auth.createUserWithEmailAndPassword(email, password).then(cred => {
                console.log(cred);
                signUpFormTeacher.reset();
                database.ref('Users/' + cred.user.uid).set({
                    UserType: "Teacher",
                });
                database.ref('Teachers/' + cred.user.uid).set({
                    Name: name,
                    Email: email
                }).then(() => {
                    location.href = 'index.html'
                })
            })
        } else {
            messageField.style.color = 'red';
            messageField.innerHTML = 'password is not matching';
        }
    })

}

const signUpFormStudent = document.querySelector('#studentForm');
if (signUpFormStudent) {
    signUpFormStudent.addEventListener('submit', e => {
        e.preventDefault();

        //get User information
        const name = signUpFormStudent['inputName'].value;
        const selYear = document.getElementById("yearList");
        const selSemester = document.getElementById("semesterList");
        const email = signUpFormStudent['inputEmail'].value;
        const password = signUpFormStudent['inputPassword'].value;
        const confirmPassword = signUpFormStudent['inputConfirmPassword'].value;
        const messageField = document.getElementById('studentMessage');
        if (password == confirmPassword) {
            auth.createUserWithEmailAndPassword(email, password).then(cred => {
                console.log(cred);
                signUpFormStudent.reset();
                database.ref('Users/' + cred.user.uid).set({
                    UserType: "Student",
                });
                database.ref('Students/' + cred.user.uid).set({
                    Name: name,
                    Email: email,
                    Year: selYear.options[selYear.selectedIndex].value,
                    Semester: selSemester.options[selSemester.selectedIndex].value,

                }).then(() => {
                    console.log(selYear.options[selYear.selectedIndex].value)
                    location.href = 'index.html'
                })
            })
        } else {
            messageField.style.color = 'red';
            messageField.innerHTML = 'password is not matching';
        }
    })

}




//sign In form
const signInForm = document.querySelector('#signIn-form');

signInForm.addEventListener('submit', e => {
    e.preventDefault();

    //get user information
    const email = signInForm['inputEmail'].value;
    const password = signInForm['inputPassword'].value;

    //sign up for the user
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        console.log('user logged in');
        database.ref('Users/' + cred.user.uid).once('value').then(function (snapShot) {
            const userInfo = snapShot.val().UserType;
            if (userInfo == 'Admin') {
                location.href = 'admin.html';
            } else if (userInfo == 'Teacher') {
                location.href = 'teacher.html';
            } else {
                location.href = 'student.html';
            }
        })
        signInForm.reset();
    }).catch(error => {
        console.log(error.message);
    })

})

//switch to create account form
const createAccountButton = document.querySelector('#createAccountButton');
createAccountButton.addEventListener('click', e => {
    const loginForm = document.querySelector('#divForSignInForm');
    const createAccountForm = document.querySelector('#divForCreateAccountForm');
    loginForm.style.display = 'none';
    createAccountForm.style.display = 'block';
})

//tab change
$('#loginForm a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
})




