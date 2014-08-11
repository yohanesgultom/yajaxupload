<?php

$allowedTypes = array("image/jpeg","image/jpg","image/png");
$allowedSize = 1000000;

if(is_array($_FILES) && is_uploaded_file($_FILES['myFile']['tmp_name'])) {	
		$error = '';
		$success = false;
		try {			
			$sourcePath = $_FILES['myFile']['tmp_name'];
			$targetPath = $_FILES['myFile']['name'];			
			if (!in_array($_FILES['myFile']['type'], $allowedTypes)) throw new Exception("Incompatible type: ".$_FILES['myFile']['type']);
			if ($_FILES['myFile']['size'] > $allowedSize) throw new Exception("Too big: ".$_FILES['myFile']['size'].' byte');
			if (file_exists($targetPath)) unlink($targetPath);
			$success = move_uploaded_file($sourcePath,$targetPath);
		} catch (Exception $e) {
			$error = $e->getMessage();
			$success = false;			
		}
		echo json_encode(array('success' => $success, 'path' => $targetPath, 'error' => $error, 'size' => $_FILES['myFile']['size']));
}
?>