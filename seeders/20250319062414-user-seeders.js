'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('users', [{
       name: 'John Doe',
       profession: 'Administrator',
       avatar: 'jhon.jpg',
       role:'admin',
       email:'jhon@email.com',
       pass:await bcrypt.hash('12345',10),
       created_at:new Date()
     },{
      name: 'Joko',
      profession: 'Operator',
      avatar:'joko.jpg',
      role:'operator',
      email:'joko@email.com',
      pass:await bcrypt.hash('abc123',10),
      created_at:new Date()
    },{
      name: 'Agus',
      profession: 'Operator',
      avatar:'agus.jpg',
      role:'operator',
      email:'agus@email.com',
      pass:await bcrypt.hash('abc123',10),
      created_at:new Date()      
     }]);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('users', null, {});
  }
};
