<?php
class Restaurant{
 
    private $conn;
    private $table_name = "grpy_restaurants";
 
    public $id;
    public $name;
    public $address1;
    public $address2;
    public $city;
    public $country;
    public $cuisine;
    
    public function __construct($db){
        $this->conn = $db;
    }

    function get() {
        $query = "SELECT
                    r.id, r.name, r.address1, r.address2, r.city, r.country, r.cuisine
                FROM
                    " . $this->table_name . " r
                WHERE
                    r.id = ?
                LIMIT
                    0,1";

        $stmt = $this->conn->prepare( $query );

        $stmt->bindParam(1, $this->id);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->name    = $row['name'];
        $this->address1 = $row['address1'];
        $this->address2 = $row['address2'];
        $this->city = $row['city'];
        $this->country = $row['country'];
        $this->cuisine = $row['cuisine'];
    }

    function list() {
        $query = "SELECT 
                    *
                FROM
                    " . $this->table_name . " r";

        $stmt = $this->conn->prepare( $query );
        $stmt->execute();

        return $stmt;
    }
}