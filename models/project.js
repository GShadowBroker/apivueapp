'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: DataTypes.STRING,
    person: DataTypes.STRING,
    due: {type:DataTypes.DATE,defaultValue:DataTypes.NOW},
    status: {
      type: DataTypes.ENUM,
      values: ['ongoing','completed','overdue'],
      defaultValue: 'ongoing',
      allowNull: false
    },
    description: DataTypes.STRING
  }, {});
  Project.associate = function(models) {
    // associations can be defined here
  };
  return Project;
};