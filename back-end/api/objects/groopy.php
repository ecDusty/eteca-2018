<?php
class Groopy{
 
    private $conn;
    private $table_name = "grpy_groopys";
 
    public $id;
    public $r_id; // restaurant id
    public $name; // restaurant name
    public $address1;
    public $address2;
    public $city;
    public $country;
    public $cuisine; // cuisine type
    public $image;
    public $time_start;
    public $time_end;
    public $max_pp;
    public $min_pp;
    public $offer;

    public function __construct($db){
        $this->conn = $db;
    }

    function get() {
        $query = "SELECT
                    count(j.id) as cur_pp, count(cfh) as chf_count, r.name, r.address1, r.address2, r.city, r.country, r.cuisine, g.id, g.r_id, g.image, g.time_start, g.time_end, g.time_cutoff, g.max_pp, g.min_pp, g.offer
                FROM
                    " . $this->table_name . " p
                LEFT JOIN
                    grpy_restaurants r
                        ON g.r_id = r.id
                LEFT JOIN
                    grpy_joins j
                        ON j.r_id = r.id
                LEFT JOIN
                    grpy_joins cfh
                        ON cfh.r_id = r.id
                WHERE
                    g.id = ?
                    AND cfh.status = 'cfh'
                LIMIT
                    0,1";

        $stmt = $this->conn->prepare( $query );

        $stmt->bindParam(1, $this->id);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id           = $row['id'];
        $this->name         = $row['name'];
        $this->address1     = $row['address1'];
        $this->address      = $row['address'];
        $this->city         = $row['city'];
        $this->country      = $row['country'];
        $this->cuisine      = $row['cuisine'];
        $this->image        = $row['image'];
        $this->time_start   = $row['time_start'];
        $this->time_end     = $row['time_end'];
        $this->time_cutoff  = $row['time_cutoff'];
        $this->max_pp       = $row['max_pp'];
        $this->min_pp       = $row['min_pp'];
        $this->offer        = $row['offer'];
        $this->cur_pp       = $row['cur_pp'];
        $this->has_cfh      = $row['cfh_count'] > 0 ? true : false;
    }

    // create user
    function create() {
    
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    name=:name, email=:email, password=:password";
    
        // prepare query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->email=htmlspecialchars(strip_tags($this->email));
        
        // bind values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);
        
        // execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function authenticate() {
        $query = "SELECT
                    p.id, p.email, p.password
                FROM
                    " . $this->table_name . "
                WHERE
                    p.email=:email
                LIMIT
                    0,1";
        
        $stmt = $this->conn->prepare( $query );

        $stmt->bindParam(":email", $this->email);

        $stmt->execute();

        $num->stmt->rowCount();

        if ($num > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $res = password_verify($this->password, $row['password']);
            if ($res) {
                return 1;
            } else {
                return 0;
            }
        } else {
            // user doesn't exist
            return -1;
        }
    }
}