<?php
class User{
 
    private $conn;
    private $table_name = "grpy_users";
 
    public $id;
    public $name;
    public $email;
    
    public function __construct($db){
        $this->conn = $db;
    }

    function getGroopys() {
        $query = "SELECT j.g_id FROM grpy_joins j WHERE j.u_id = ?";

        $stmt = $this->conn->prepare( $query );
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        
        return $stmt;
    }

    function get() {
        $query = "SELECT
                    p.id, p.name, p.email
                FROM
                    " . $this->table_name . " p
                WHERE
                    p.id = ?
                LIMIT
                    0,1";

        $stmt = $this->conn->prepare( $query );

        $stmt->bindParam(1, $this->id);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->name = $row['name'];
        $this->email = $row['email'];
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

    function checkin($code) {

        // shortcut check-in for demo purposes
        // normally this should go like:
        // scan code -> identify restaurant -> identify valid groopy hosted here -> has user joined this groopy
        $query = "UPDATE
                    grpy_joins j
                SET 
                    status = 'checked'
                WHERE
                    u_id = 1
                    AND 
                    g_id = 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":code", $code);
        $stmt->execute();
        return $stmt; 
    }

    function join($g_id) {
        $query = "SELECT
                    g.max_pp, (SELECT COUNT(*) FROM grpy_join j WHERE j.g_id = '" . $g_id . "' AND j.status LIKE 'confirmed') as cur_pp
                FROM 
                    grpy_groopys g
                WHERE
                    g.id = '" . $g_id . "'
                LIMIT
                    0,1";
        
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
        $num = $stmt->rowCount();
        if ($num > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if (intval($row['max_pp']) > intval($row['cur_pp'])) {
                $insQuery = "INSERT INTO
                                grpy_joins (`u_id`, `g_id`, `status`)
                            VALUES
                                ('".$this->id."', '".$g_id."', 'confirmed')";
                $stmt = $this->conn->prepare( $insQuery );
                $stmt->execute();
                return 1;
            } else {
                // full
                return 0;
            }
            
        } else {
            // groopy not found
            return -1;
        }
        
    }
}