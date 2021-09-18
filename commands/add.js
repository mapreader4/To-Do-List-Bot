const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../models/userSchema.js');
const task = require('../models/taskSchema.js');

module.exports = {
    name: 'add',
    category: 'write',
    description: 'adds an item to the to-do list',
    usage: `add`,
    async execute(message, args, command, client, Discord, db){

        var userid = message.author.id;
        //message.channel.send(uid);

//if user doesn't exist, add new user
        User.countDocuments({uid: userid}, function (err, count, userid){
          console.log(count);
          if(count===0){

            const newUser = new User({id: 123, optIn: false, lastDate: "09/28/2003"});

            newUser.save();
          }
        });



//separate parameters
        var index = 1;
        var date = new Date(args[0]);

        if(isNaN(date)){
          index = 0;
          //date = lastDate;
        }

        var taskName = "";
        while(args[index]){
          taskName += " " + args[index];
          index++;
        }

        var thisUser = User.findOne({uid : userid});

        const newTask = new task({name: taskName, date: date, complete: false, id: User.tasks.length})
        thisUser.tasks.push(newTask);

        //task.create({name: taskName, date: date, complete: false, id: User.countDocuments()});

        //let doc = await users.findOneAndUpdate({uid: userid}, {tasks: taskName});




        // lists all databases, client parameter may need adjustment
        async function listDatabases(client) {
            const databasesList = await client.db().admin().listDatabases()

            console.log("Databases:");
            databasesList.databases.forEach( db => {
            console.log(`- ${db.name}`)
           })
        }
        listDatabases(client)
        // lists all databases, client parameter may need adjustment

        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle('Added Task: \"' + taskName + "\" to " + date.toString().slice(0,15)); //add task name: read from DB
        //.setDescription(args[0]);

        message.channel.send(embed);
    }
}
