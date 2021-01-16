Service.init(
    {
        //table definitions
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }, 
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        style: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
           type: DataTypes.STRING,
           allowNull: false
       },
        price: {
           type: DataTypes.DECIMAL,
           allowNull: false
       },
        time_alloted: {
            type: DataTypes.INTEGER,

       },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'stylist',
                key: 'id'
            } 
        }
    }