function skillsMember() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCJ-1dA2F8fN5DpRjWc2rPm7Z3q5w1h3eU",
    authDomain: "skills-4a7b0.firebaseapp.com",
    databaseURL: "https://skills-4a7b0.firebaseio.com",
    storageBucket: "skills-4a7b0.appspot.com",
    messagingSenderId: "1075612033898"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var ref = database.ref('users');

  var $skills = $('#skills');
  var $skillsList = $('#skills-list');

  ref.on('value', function(snapshot) {
    var users = snapshot.val();
    var skills = [];

    for (var id in users) {
      var user = users[id];
      var userSkills = user.skills;

      for (var i = 0; i < userSkills.length; i++) {
        if (skills.indexOf(userSkills[i]) === -1) {
          skills.push(userSkills[i]);
        }
      }
    }

    skills.sort();

    for (var i = 0; i < skills.length; i++) {
      $skillsList.append('<option value="' + skills[i] + '">' + skills[i] + '</option>');
    }
  });

  $skills.change(function() {
    var skill = $skills.val();

    ref.on('value', function(snapshot) {
      var users = snapshot.val();
      var usersWithSkill = [];

      for (var id in users) {
        var user = users[id];
        var userSkills = user.skills;

        if (userSkills.indexOf(skill) !== -1) {
          usersWithSkill.push(user);
        }
      }

      if (usersWithSkill.length) {
        var html = '<ul>';

        for (var i = 0; i < usersWithSkill.length; i++) {
          html += '<li>' + usersWithSkill[i].name + '</li>';
        }

        html += '</ul>';

        $('#users').html(html);
      } else {
        $('#users').html('No users found.');
      }
    });
  });
}
