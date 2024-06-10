
class Property{
    constructor(id, address, description, cost) {
        this.id = id;
        this.address = address;
        this.description = description;
        this.cost = cost;
    }

    toJSON() {
        return {
            "id": this.id,
            "address": this.address,
            "description": this.description,
            "price": this.cost
        };
    }


    static jsonTONewProperty(property){
        return new Property(
            property.id, 
            property.address, 
            property.description, 
            property.cost
        );
    }
}


module.exports = {Property}