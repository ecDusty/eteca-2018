<?php
class Restaurant{
 
    private $conn;
    private $table_name = "grpy_restaurants";
 
    public $id;
    public $name;
    public $address;
    public $cuisine;
    
    public function __construct($db){
        $this->conn = $db;
    }

    function get() {
        $query = "SELECT
                    r.id, r.name, r.address, r.cuisine
                FROM
                    " . $this->table_name . " p
                WHERE
                    r.id = ?
                LIMIT
                    0,1";

        $stmt = $this->conn->prepare( $query );

        $stmt->bindParam(1, $this->id);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->name    = $row['name'];
        $this->address = $row['address'];
        $this->cuisine = $row['cuisine'];
    }
}