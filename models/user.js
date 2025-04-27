'use strict';
const {
  Model,
  Sequelize,
  DataTypes
} = require('sequelize');


const sequelize=require('../config/database');
module.exports=sequelize.define('Users',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull:false,
    unique:true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user'
  },
  emailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
},{
  paranoid:false,
  freezeTableName:true,
  modelName:'Users',
  timestamps: true // 👈 make sure this is true (by default it is)
})