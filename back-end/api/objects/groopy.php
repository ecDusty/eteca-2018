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
                    count(j.id) as cur_pp, (SELECT count(*) FROM grpy_joins cfh WHERE cfh.g_id = g.id AND cfh.status = 'cfh') as cfh_count, r.name, r.address1, r.address2, r.city, r.country, r.cuisine, r.image, g.id, g.r_id, g.time_start, g.time_end, g.time_cutoff, g.max_pp, g.min_pp, g.offer
                FROM
                    " . $this->table_name . " g
                LEFT JOIN
                    grpy_restaurants r
                        ON g.r_id = r.id
                LEFT JOIN
                    grpy_joins j
                        ON j.g_id = g.id
                WHERE
                    g.id = ?
                LIMIT
                    0,1";

        $stmt = $this->conn->prepare( $query );

        $stmt->bindParam(1, $this->id);

        $stmt->execute();

        return $stmt;
    }

    function list() {
        $query = "SELECT
                    count(j.id) as cur_pp, (SELECT count(*) FROM grpy_joins cfh WHERE cfh.g_id = g.id AND cfh.status = 'cfh') as cfh_count, r.name, r.address1, r.address2, r.city, r.country, r.cuisine, r.image, g.id, g.r_id, g.time_start, g.time_end, g.time_cutoff, g.max_pp, g.min_pp, g.offer
                FROM
                    " . $this->table_name . " g
                LEFT JOIN
                    grpy_restaurants r
                        ON g.r_id = r.id
                LEFT JOIN
                    grpy_joins j
                        ON j.g_id = g.id";

        $stmt = $this->conn->prepare( $query );
        $stmt->execute();

        return $stmt;
    }

    function listByRestaurant() {
        $query = "SELECT
                    g.id, g.time_start, g.time_end, g.time_cutoff, g.max_pp, g.min_pp, g.offer
                FROM
                    " . $this->table_name . " g
                WHERE
                    g.r_id = ?";
        
        $stmt = $this->conn->prepare( $query );
        $stmt->bindParam(1, $this->r_id);
        $stmt->execute();

        return $stmt;
    }

    function create() {
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    r_id=:r_id, time_start=:time_start, time_end=:time_end, time_cutoff=:time_cutoff, max_pp=:max_pp, min_pp=:min_pp, offer=:offer";
    
        // prepare query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->offer=htmlspecialchars(strip_tags($this->offer));
        
        // bind values
        $stmt->bindParam(":r_id", $this->r_id);
        $stmt->bindParam(":time_start", $this->date . " " . $this->time_start);
        $stmt->bindParam(":time_end", $this->date . " " . $this->time_end);
        $stmt->bindParam(":time_cutoff", $this->date . " " . $this->time_cutoff);
        $stmt->bindParam(":max_pp", $this->max_pp);
        $stmt->bindParam(":min_pp", $this->min_pp);
        $stmt->bindParam(":offer", $this->offer);
        
        // execute query
        if($stmt->execute()) {
            return true;
        }
    
        return false;
    }
}