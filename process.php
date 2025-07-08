<?php
// Configure your Subject Prefix and Recipient here
$subjectPrefix = '[Contact via website]';
$emailTo       = 'info@crescentfurnishings.com';
$errors = array(); // array to hold validation errors
$data   = array(); // array to pass back data

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST["name"];
    $mobile = $_POST["mobile"];
    $email = $_POST["email"];
    $product = $_POST["product"];
    $message = $_POST["message"];
    $subject = 'Website Inquiry';

    if (empty($name)) {
        $errors['name'] = 'Name is required.';
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Email is invalid.';
    }
    if (empty($message)) {
        $errors['message'] = 'Message is required.';
    }
    // if there are any errors in our errors array, return a success boolean or false
    if (!empty($errors)) {
        $data['success'] = false;
        $data['errors']  = $errors;
    } else {
        $subject = "$subjectPrefix $subject";
        $body   = "Name: $name\n\nMobile: $mobile\n\nEmail: $email\n\nProduct: $product\n\nMessage:\n$message";
        $headers  = "MIME-Version: 1.1" . PHP_EOL;
        $headers .= "Content-type: text/plain; charset=utf-8" . PHP_EOL;
        $headers .= "From: $email" . PHP_EOL;
        $headers .= "Reply-To: $email" . PHP_EOL;
        mail($emailTo, $subject, $body, $headers);
        $data['success'] = true;
        $data['message'] = 'Congratulations. Your message has been sent successfully. Our team will get back to you soon!';
    }
    // return all our data to an AJAX call
    echo json_encode($data);
}
?>
