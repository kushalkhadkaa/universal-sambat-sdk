// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "NepaliDatePicker",
    platforms: [
        .iOS(.v14),
        .macOS(.v11)
    ],
    products: [
        .library(
            name: "NepaliDatePicker",
            targets: ["NepaliDatePicker"]
        ),
    ],
    targets: [
        .target(
            name: "NepaliDatePicker",
            path: "Sources/NepaliDatePicker"
        ),
        .testTarget(
            name: "NepaliDatePickerTests",
            dependencies: ["NepaliDatePicker"],
            path: "Tests/NepaliDatePickerTests"
        ),
    ]
)
